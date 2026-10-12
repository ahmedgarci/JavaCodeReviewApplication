import { useEffect, useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import useFetch from "../../Services/Fetch";
import Loader from "../Global/Loader";
import { useNavigate, useParams } from "react-router-dom";
import type { QualitySettings } from "../../Models/QualitySettings";

interface Props {
  open: boolean;
  onClose: () => void;
}

type NumericSetting =
  | "minCoverage"
  | "maxBugs"
  | "maxVulnerabilities"
  | "maxCodeSmells";

export default function QualitySettingsModal({ open, onClose }: Props) {
  const [settings, setSettings] = useState<QualitySettings>({
    min_coverage: 70,
    max_bugs: 60,
    max_vulnerabilities: 12,
    max_code_smells: 12,
    enabled: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/repositories");
    }
  }, [id, navigate]);

  const { data, error, loading } = useFetch<QualitySettings>(`/settings/${id}`);

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  const update = (key: NumericSetting, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!open) return null;

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="p-6 text-sm text-red-600">
        Failed to load quality settings.
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h2 className="font-semibold text-black">Quality Settings</h2>
              <p className="text-xs text-neutral-500">
                Configure the quality gate
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black"
          >
            <X size={18} />
          </button>
        </div>

        {/* Settings */}
        <div className="space-y-4 p-5">
          <Setting
            label="Minimum Coverage"
            description="Minimum required test coverage"
          >
            <input
              type="number"
              min={0}
              max={100}
              value={settings.min_coverage}
              onChange={(e) => update("minCoverage", Number(e.target.value))}
              className="w-20 rounded-lg border border-neutral-200 px-3 py-2 text-center text-sm outline-none focus:border-black"
            />
          </Setting>

          <Setting
            label="Maximum Bugs"
            description="Maximum number of bugs allowed"
          >
            <input
              type="number"
              min={0}
              value={settings.max_bugs}
              onChange={(e) => update("maxBugs", Number(e.target.value))}
              className="w-20 rounded-lg border border-neutral-200 px-3 py-2 text-center text-sm outline-none focus:border-black"
            />
          </Setting>

          <Setting
            label="Maximum Vulnerabilities"
            description="Maximum security vulnerabilities allowed"
          >
            <input
              type="number"
              min={0}
              value={settings.max_vulnerabilities}
              onChange={(e) =>
                update("maxVulnerabilities", Number(e.target.value))
              }
              className="w-20 rounded-lg border border-neutral-200 px-3 py-2 text-center text-sm outline-none focus:border-black"
            />
          </Setting>

          <Setting
            label="Maximum Code Smells"
            description="Maximum maintainability issues allowed"
          >
            <input
              type="number"
              min={0}
              value={settings.max_code_smells}
              onChange={(e) =>
                update("maxCodeSmells", Number(e.target.value))
              }
              className="w-20 rounded-lg border border-neutral-200 px-3 py-2 text-center text-sm outline-none focus:border-black"
            />
          </Setting>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-neutral-200 bg-neutral-50 p-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm hover:bg-neutral-100"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}


function Setting({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
      <div>
        <p className="text-sm font-medium text-black">{label}</p>
        <p className="mt-1 text-xs text-neutral-500">{description}</p>
      </div>

      {children}
    </div>
  );
}