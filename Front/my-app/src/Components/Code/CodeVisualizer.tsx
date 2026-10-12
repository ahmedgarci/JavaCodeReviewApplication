import type { FileContentResponse } from "../../Models/SubmissionDetails";
import useFetch from "../../Services/Fetch";
import Editor from "@monaco-editor/react";
import Loader from "../Global/Loader";

import { useEffect, useRef, useState } from "react";
import { editor } from "monaco-editor";
import * as monaco from "monaco-editor";
import CommentModal from "./Modal";



interface CodeProps {
    fileId: number;
    submissionId: number;
    fileName: string;
    isEditable:boolean
}


export default function CodeVisualizer({submissionId,fileId,fileName,isEditable}: CodeProps) {

    const {data: fileData,loading,error} = useFetch<FileContentResponse>(`/submission/${submissionId}/file/${fileId}`);

    const [editorInstance, setEditorInstance] =useState<editor.IStandaloneCodeEditor | null>(null);

    const decorationsRef = useRef<string[]>([]);

    const [selectedLine, setSelectedLine] =useState<number | null>(null);
    const [isCommentModalOpen, setIsCommentModalOpen] =useState(false);

    /*
        When Monaco is mounted
    */
    const handleEditorMount = (
        editorInstance: editor.IStandaloneCodeEditor
    ) => {

        setEditorInstance(editorInstance);

    };




    /*
        Detect click on glyph margin
    */
    useEffect(() => {

        if (!editorInstance)
            return;


        const disposable =editorInstance.onMouseDown((event) => {
                if (event.target.type !==monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
                    return;
                }
                const line =event.target.position?.lineNumber;
                if (!line)
                    return;
                setSelectedLine(line);
                setIsCommentModalOpen(true);
            });
        return () => {

            disposable.dispose();
        };
    }, [editorInstance]);


    useEffect(() => {


        if (!editorInstance || !fileData)
            return;



        const decorations =
            fileData.comments.map(comment => ({


                range: {

                    startLineNumber:
                        comment.line_number,

                    startColumn: 1,

                    endLineNumber:
                        comment.line_number,

                    endColumn: 4

                },


                options: {

                    glyphMarginClassName:
                        "comment-icon"

                }


            }));



        decorationsRef.current =
            editorInstance.deltaDecorations(
                decorationsRef.current,
                decorations
            );



    }, [editorInstance, fileData]);





    /*
        Display comments inside editor
    */
    useEffect(() => {


        if (!editorInstance || !fileData)
            return;



        const widgets:
            editor.IContentWidget[] = [];




        fileData.comments.forEach(comment => {



            const widget:
                editor.IContentWidget = {


                getId: () =>
                    `comment-${comment.id}`,

                getDomNode: () => {

                    const div =
                        document.createElement("div");

                    div.className = "comment-widget";
                    div.innerHTML = ` <div class="font-bold">
                            ${comment.author}
                        </div>

                        <div>
                            ${comment.content}
                        </div>

                    `;


                    return div;

                },




                getPosition: () => ({

                    position: {

                        lineNumber:
                            comment.line_number,

                        column: 1

                    },


                    preference: [

                        editor.ContentWidgetPositionPreference.BELOW

                    ]

                })

            };




            editorInstance.addContentWidget(widget);

            widgets.push(widget);


        });




        return () => {


            widgets.forEach(widget => {

                editorInstance.removeContentWidget(widget);

            });


        };



    }, [editorInstance, fileData]);







    if (loading)
        return <Loader />;



    if (error)
        return (
            <div>
                Error loading file
            </div>
        );



    const decodedContent =
        fileData?.content
            ? atob(fileData.content)
            : "";





    return (


        <div className="rounded-xl border overflow-hidden">


            <div className="bg-gray-100 px-4 py-2 font-semibold">

                {fileName}

            </div>




            <Editor


                height="600px"


                language="java"


                theme="vs-dark"


                value={decodedContent}



                onMount={handleEditorMount}


                options={{

                    glyphMargin: true,


                    readOnly: !isEditable,


                    minimap: {

                        enabled: false

                    },


                    fontSize: 14,


                    wordWrap: "on"


                }}



            />

            {
                isCommentModalOpen && (

                    <CommentModal

                        submissionId={submissionId}

                        fileId={fileId}

                        lineNumber={selectedLine}


                        onClose={() =>
                            setIsCommentModalOpen(false)
                        }


                    />

                )
            }





        </div>


    );

}