import { useState } from "react";
import { CreateComment } from "../../Services/CommentService";
import { toast } from "react-toastify";


interface CommentModalProps {

    submissionId: number;
    fileId: number;
    lineNumber: number | null;

    onClose: () => void;

}



export default function CommentModal({
    submissionId,
    fileId,
    lineNumber,
    onClose
}: CommentModalProps) {


    const [content, setContent] =
        useState("");

    const [loading, setLoading] =
        useState(false);



    async function createComment() {


        if (!content.trim())
            return;

        try {

            setLoading(true);

            await CreateComment(submissionId,fileId,lineNumber as number,content);
            
            setContent("")
            
        } catch(error) {
            console.error(error);
            toast.error("user is not allowed to review this submission.");

        } finally {


            setLoading(false);

        }

    }




    return (

        <div
            className="
                fixed inset-0 
                bg-black/50
                flex items-center justify-center
                z-50
            "
        >


            <div
                className="
                    bg-white
                    rounded-xl
                    p-6
                    w-96
                    shadow-xl
                "
            >



                <h2
                    className="
                        text-lg
                        font-semibold
                        mb-4
                    "
                >

                    Add comment

                </h2>




                <p
                    className="
                        text-sm
                        text-gray-600
                        mb-3
                    "
                >

                    Line {lineNumber}

                </p>





                <textarea

                    value={content}

                    onChange={(e) =>
                        setContent(e.target.value)
                    }


                    placeholder="
                        Write your comment...
                    "


                    className="
                        w-full
                        border
                        rounded-lg
                        p-3
                        h-32
                        resize-none
                    "

                />





                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        mt-4
                    "
                >



                    <button

                        onClick={onClose}

                        className="
                            px-4
                            py-2
                            rounded-lg
                            bg-gray-200
                        "

                    >

                        Cancel

                    </button>





                    <button

                        disabled={loading}

                        onClick={createComment}


                        className="
                            px-4
                            py-2
                            rounded-lg
                            bg-blue-600
                            text-white
                        "

                    >

                        {
                            loading
                            ?
                            "Sending..."
                            :
                            "Comment"
                        }


                    </button>




                </div>



            </div>



        </div>

    );

}