import { useEffect } from "react";
import InvitationService from "../../Services/InvitationService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function InvitationAccepting() {
    const navigate = useNavigate();
    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      toast.error("Invalid invitation link.");
      navigate("/");
      return;
    }

    const acceptInvitation = async () => {
      try {
        await InvitationService.acceptInvitation(code);
        navigate("/repositories");
      } catch (error) {
        console.error(error);

        toast.error("An error occurred while accepting the invitation.");
      }
    };

    acceptInvitation();
  }, [navigate]);
  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col">

      {/* Center */}
      <main className="flex flex-1 items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[420px] text-center">

          {/* Small brand mark */}
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#e9e5dc]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#c8c1b5] border-t-[#171717]" />
          </div>

          <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#171717]">
            Accepting your invitation
          </h1>

          <p className="mx-auto mt-4 max-w-[340px] text-[15px] leading-6 text-[#6b6862]">
            We're getting everything ready for you.
            <br />
            This should only take a moment.
          </p>

          {/* Loading indicator */}
          <div className="mt-8 flex justify-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#171717]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#9b978f] [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d0ccc4] [animation-delay:300ms]" />
          </div>

        </div>
      </main>

     

    </div>
  );
}