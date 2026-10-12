import { useState } from "react";
import InvitationService from "../../Services/InvitationService";
import { toast } from "react-toastify";

export default function AddCollaboratorDialog({open,setOpen,projectId}:{
    open:boolean,setOpen:(value: boolean) => void,projectId:string;
}) {
    const [email, setEmail] = useState("");
    const [error,setError] = useState("");

  const handleSubmit = async(e:any) => {
    e.preventDefault();

    if (!email.trim()) return;
    try {
        await InvitationService.sendInvitation(email,projectId);
        toast.success("invitation sent ")
        setEmail("")
    } catch (error:any) {
        console.log(error)
        setError(error.message)
    }

  };

  return (
    <>
      {/* Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="collaborator-title"
            className="w-full max-w-[420px] rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6">
              <h2
                id="collaborator-title"
                className="text-lg font-semibold tracking-tight text-zinc-950"
              >
                Add collaborator
              </h2>

              <p className="mt-1.5 text-sm leading-5 text-zinc-500">
                Invite someone to collaborate on this code review.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="collaborator-email"
                className="mb-2 block text-sm font-medium text-zinc-800"
              >
                Email address
              </label>

              <input
                id="collaborator-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
                required
                className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
              />

{error && (
  <div className="flex mt-2 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] text-red-700">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>

    <p>{error}</p>
  </div>
)}

              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-10 rounded-lg px-4 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!email.trim()}
                  className="h-10 rounded-lg bg-black px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
