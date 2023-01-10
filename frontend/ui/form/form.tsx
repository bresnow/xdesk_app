import type { FetcherWithComponents } from "@remix-run/react";
import React from "react";
import { Avatar, Button, Text } from "../";
import { ContentEditable } from "../editable";
import { useIff } from '@utils/useIff';

export interface ContractForm_ConstructOptions {
  action: string;
  button: ContractButton_ConstructOptions;
  method?: "get" | "post"
  title: ContractHeader_ConstructOptions
  inputs: ContractInput_ConstructOptions[];
  onSubmit?: ({ id }: { id: string }) => void;
  fetcher: FetcherWithComponents<any>;
};
export type ContractInput_ConstructOptions = { name: string; header: string; description: string; placeholder?: string; edit?: boolean; }
export type ContractButton_ConstructOptions = { label: string; isValid?: boolean; isSubmitting?: boolean; name: string; value: string; aria_label: string; color?: "default" | "primary" | "red" | "green" | "white" | undefined };
export type ContractHeader_ConstructOptions = { name: string; header: string; edit?: boolean }
export const ContentForm = ({ title, action, method, button, inputs, onSubmit, fetcher }: ContractForm_ConstructOptions) => {

  return (
    <div className="flex-col gap-3.5 mx-auto p-3 bg-white">
      <fetcher.Form
        onSubmit={() => onSubmit && onSubmit}
        action={action}
        method={method ?? "post"}
        className="flex flex-auto mx-auto px-2 flex-col gap-3.5"
      >
        <EditableHeader
          header={title.header}
          name={title.name}
          edit={title.edit} />
        {inputs.map((input) => {
          return (
            <ContractInput
              name={input.name}
              header={input.header}
              description={input.description}
              placeholder={input.placeholder}
            />)
        })}
        <div className="flex justify-center">
          <SubmitButton {...button} />
        </div>
      </fetcher.Form>
      <div className="flex p-6">{fetcher.data && (JSON.stringify(fetcher.data, null, 2))}</div>
    </div>
  );
};

const ContractInput = ({ name, header, description, placeholder, edit }: ContractInput_ConstructOptions) => {
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
      </div>
      <ContentEditable
        className={`border border-slate-800 rounded-xl p-1 border-1 focus:outline-none`}
        name={name}
        id={name}
        edit={edit ?? true}
      >
        <Text >
          {placeholder}
        </Text>
      </ContentEditable>
    </>

  );
};
const EditableHeader = ({ name, header, edit }: ContractHeader_ConstructOptions) => {
  return (
    <ContentEditable
      className=" border-b border-b-red-500 py-3 focus:outline-none"
      name={name}
      id={name}
      edit={edit ?? true}
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
      {/* <div className="flex-shrink-0 mx-2 -mb-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg">
				<svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none">
					<rect
						x="159.52"
						y="175"
						width="152"
						height="152"
						rx="8"
						transform="rotate(-45 159.52 175)"
						fill="#a17cf3"
					/>
					<rect
						y="107.48"
						width="152"
						height="152"
						rx="8"
						transform="rotate(-45 0 107.48)"
						fill="#a17cf3"
					/>
				</svg>
				<div className="relative pt-10 px-10 flex items-center justify-center">
					<div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
					<img className="relative w-40" src={image ??"/images/gradient.webp"} alt="shopping" />
				</div>
				<div className="relative text-white px-6 pb-6 mt-6">
					<span className="block opacity-75 -mb-1">Outdoor</span>
					<div className="flex justify-between">
						<span className="block font-semibold text-xl">Oak Tree</span>
						<span className="bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
							$68.50
						</span>
					</div>
				</div>
			</div> */}
    </>
  );
};