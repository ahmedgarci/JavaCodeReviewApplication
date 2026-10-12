
import { useState } from "react";
import { Loader2, BarChart3 } from "lucide-react";
import { handleSonarAnalysis } from "../../Services/SubmissionService";

const SonarAnalysisButton = ({projectId,onClose}:{projectId: number,onClose: () => void}) => {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSonarSelect() {
    try {
      setLoading(true);
      await handleSonarAnalysis(projectId);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSonarSelect}
      disabled={loading}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        px-4
        py-2
        rounded-lg
        border
        border-gray-300
        bg-white
        text-black
        text-sm
        font-medium
        transition-all
        duration-200
        hover:bg-black
        hover:text-white
        hover:border-black
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <>
          <Loader2
            size={16}
            className="animate-spin"
          />
          Analyzing...
        </>
      ) : (
        <>
          <BarChart3 size={16} />
          SonarQube
        </>
      )}
    </button>
  );
};

export default SonarAnalysisButton;
