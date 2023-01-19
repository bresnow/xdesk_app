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
  React.useEffect(() => {
    if (ref.current && ref.current instanceof HTMLDivElement) {
      let el = ref.current;
      let input = document.getElementById(name);
      el.onload = ({ target }) => {
        if (
          target instanceof HTMLDivElement &&
          input instanceof HTMLInputElement
        ) {
          target.innerText = input.defaultValue
          console.log(input.value + " Loaded CONTENTEDIATBLE")
        }
      };
      el.onsubmit = ({ target, type }) => {
        if (
          target instanceof HTMLDivElement &&
          input instanceof HTMLInputElement

        ) {
          target.innerText = input.value;
          console.log(input.value + " SUBMITTING CONTENTEDIATBLE")
        }
      };
      el.onchange = ({ target }) => {
        if (
          target instanceof HTMLDivElement &&
          input instanceof HTMLInputElement
        ) {
          target.innerText = input.value;
          console.log(input.value + " CHANGE CONTENTEDIATBLE")
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);
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
      <input id={name} name={name} type="hidden" />
    </>
  );
};
