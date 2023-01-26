import React from "react";
export type IContentEditable = {
  children: React.ReactNode;
  name: string;
  id: string;
  edit?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "contentEditable">;

export const ContentEditable = ({
  children,
  name,
  id,
  edit,
  ...props
}: IContentEditable) => {
  let ref = React.useRef<HTMLDivElement>(null);
  let [value, setValue] = React.useState('')
  React.useEffect(() => {
    if (ref.current && ref.current instanceof HTMLDivElement) {
      let el = ref.current;
      setValue(el.innerText)
    }
  }, [children, ref]);
  return (
    <>
      <div
        ref={ref}
        {...props}
        contentEditable={edit}
        suppressContentEditableWarning={edit}

      >
        {children}
      </div>
      <input id={name} name={name} value={value} type="hidden" />
    </>
  );
};
