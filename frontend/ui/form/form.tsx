import { Form } from "@remix-run/react"
import React from "react";
import { Button, Text } from "../";
import { ContentEditable } from "../editable";
import { IContentEditable } from '../editable/editable';
import IconSvg, { SVG } from "@ui/svg/logos/SvgIcon";
export interface ContractForm_ConstructOptions {
  action: string;
  button: ContractButton_ConstructOptions;
  method?: "get" | "post"
  title: ContractHeader_ConstructOptions
  inputs?: ContractInput_ConstructOptions[];
  onSubmit?: ({ id }: { id: string }) => void;
  hidden?: { name: string; value: string; id: string }[]
};
export type ContractInput_ConstructOptions = { header: string; description: string; value: string; dropdown?: DropDownMenu_Props, icon?: SVG } & Omit<IContentEditable, "children">
export type ContractButton_ConstructOptions = { label: string; isValid?: boolean; isSubmitting?: boolean; name: string; value: string; aria_label: string; color?: "default" | "primary" | "red" | "green" | "white" | undefined };
export type ContractHeader_ConstructOptions = { name: string; header: string; edit?: boolean }
export const ContentForm = ({ title, action, method, button, inputs, onSubmit, hidden }: ContractForm_ConstructOptions) => {
  return (
    <div className="flex-col gap-3.5 mx-auto p-3 bg-white">
      <EditableHeader
        header={title?.header}
        name={title?.name}
        edit={title?.edit} />
      <Form
        onSubmit={() => {
          button.isSubmitting = true
          onSubmit && onSubmit
        }}
        action={action}
        method={method ?? "post"}
        className="flex flex-auto mx-auto px-2 flex-col gap-3.5"
      >
        {inputs && inputs?.map((input) => {
          return (
            <ContractInput
              {...input}
            />)
        })}
        {hidden?.map(({ name, value, id }) => {
          return (<input type="text" id={id} name={name} value={value} hidden />)
        })}
        <div className="flex justify-center">
          <SubmitButton {...button} />
        </div>
      </Form>
    </div>
  );
};

export const ContractInput = ({ dropdown, header, description, edit, value, ...props }: ContractInput_ConstructOptions) => {
  return (
    <>
      <div>
        <Text
          weight={6}
          className="font-medium text-lg"
        >
         <label className='font-display block dark:text-slate-800'>
            {header}
          </label>
        </Text>
        <p className='text-2xs mb-1'>
          {description}
        </p>
      {  dropdown && <DropDownMenu {...dropdown} />}
      </div>
      {!dropdown && <ContentEditable
        className={props.className ?? `border border-slate-800 rounded-xl p-1 ${edit?"border-1" : "border-none"}focus:outline-none`}
        edit={edit}
        {...props}
      >
      {value}
      </ContentEditable>}
    </>

  );
};
export interface DropDownMenu_Props {
  forceOpen?: boolean;
  label?: string;
  withDivider?: boolean;
  icon?: SVG;
  items: ContractInput_ConstructOptions[];
  withBackground?: boolean;
}


export const DropDownMenu = (props: DropDownMenu_Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={` ${props.withBackground
            ? "border border-gray-300 bg-white dark:bg-gray-800 shadow-sm"
            : ""
            } flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500`}
          id="options-menu"
        >
          {props.label}

          {props.icon ? <IconSvg {...props.icon} /> :
            <IconSvg path={"M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"} size={'20'} />}
        </button>
      {(props.forceOpen || isOpen) && (
        <div className="origin-top-right  right-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div
            className={`py-1 ${props.withDivider ? "divide-y divide-gray-100" : ""
              }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {props.items.map((item) => {
              return (
                <div
                  key={item.header}
                  className={`${item.icon ? "flex items-center" : "flex items-baseline"
                    } block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600`}
                  role="menuitem"
                >
                  <span className="flex flex-col">
                  {item.icon && <IconSvg size={"40"}
                    {...item?.icon} />
                  }
                    <ContractInput
                      {...item}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>

    </div>
  );
};
const EditableHeader = ({ name, header, edit }: ContractHeader_ConstructOptions) => {
  return (
    <ContentEditable
      className=" border-b border-b-red-500 py-3 focus:outline-none"
      name={name}
      id={name}
      edit={edit ?? true}
      defaultValue={header}
    >
      <Text weight={7} className="font-black text-2xl">
        {header}
      </Text>
    </ContentEditable>
  );
};


const SubmitButton = ({ name, value, aria_label, label, color, isSubmitting = false, isValid = true }: ContractButton_ConstructOptions) => {
  const disabled = isSubmitting || !isValid;
  return (
    <Button
      name={name}
      value={value}
      type="submit"
      color={color ?? "default"}
      aria-label={aria_label}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};




export const ServiceOption = ({
  name,
  label,
  value,
  image,
  price,
}: {
  name: string;
  value: string;
  label: string;
  image?: string;
  price: string;
}) => {
  return (
    <>
      <div className="flex-shrink-0 mx-2 mb-6 sm:mb-0 relative overflow-hidden bg-blue-500 rounded-lg max-w-xs shadow-lg">
        <svg
          className="absolute bottom-0 left-0 mb-8"
          viewBox="0 0 375 283"
          fill="none"
        >
          <rect
            x="159.52"
            y="175"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 159.52 175)"
            fill="#6da3fb"
          />
          <rect
            y="107.48"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 0 107.48)"
            fill="#6da3fb"
          />
        </svg>
        <div className="relative pt-10 px-10 flex items-center justify-center">
          <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
          <img
            className="relative w-40"
            src={image ?? "/images/gradient1.webp"}
            alt="shopping"
          />
        </div>
        <div className="relative text-white px-6 pb-6 mt-6">
          <span className="block opacity-75 -mb-1">{name}</span>
          <div className="flex justify-between">
            <span className="block font-semibold text-xl">{label}</span>
            <span className="bg-white rounded-full text-blue-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
              {price} = {value}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};