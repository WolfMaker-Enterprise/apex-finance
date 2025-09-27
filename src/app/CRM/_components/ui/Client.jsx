import React from "react";

export default function Client({ nome }) {
  return (
    <div className="mt-auto pt-6">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="text-sm">
          <div className="font-medium">{nome}</div>
        </div>
      </div>
    </div>
  );
}
