import NameSpacePreviewMap from "@ui/kit/components/pagesection/blog/BlogList";
export const handle = {
  header: {
    title: "Home",
  },
};

export default function Home() {

  return (
    <div className="h-screen">
      {/* <AccountMenu /> */}
      <NameSpacePreviewMap />
    </div>
  );
}
