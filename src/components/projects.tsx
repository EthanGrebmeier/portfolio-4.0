import React from "react";
import ResponsiveDialog from "./ui/responsive-dialog";
import Link from "next/link";

const Projects = () => {
  return (
    <ResponsiveDialog
      title="Projects"
      trigger={<button className="btn btn-primary">View Projects</button>}
    >
      <Link href="/projects/fillaneed">Fillaneed</Link>
    </ResponsiveDialog>
  );
};

export default Projects;
