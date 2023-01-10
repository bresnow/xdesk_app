import { useFetcher } from "@remix-run/react";
import React from "react";
import { Avatar, Button, Text } from "../";
import { ContentEditable } from "../editable";
import { useIff } from '@utils/useIff';

export type TweetFormProps = {
  onSubmit?: ({ id }: { id: string }) => void;
};

export const ContentForm = ({ onSubmit }: TweetFormProps) => {
  const fetcher = useFetcher();
useIff
  return (
    <div className="flex-col gap-3.5 mx-auto p-3 bg-white">
      <Avatar
        className="rounded-full h-8 w-8 mx-auto"
        src={"/images/gradient.webp"}
        alt={"Bresnow"}
        size="lg"
      />
      <fetcher.Form
        onSubmit={() => onSubmit && onSubmit}
        action={"/api/createAccount"}
        method="post"
        className="flex flex-auto mx-auto px-2 flex-col gap-3.5"
      >
        <EditableHeader header={'Contract Title'} name={"title"} />
        <ContractInput name="accountID" header={'Wallet ID'} description={`WalletID`} placeholder={fetcher.data?.publicKey && fetcher.data?.publicKey} />
        <ContractInput name="secret" header={'Secret Key'} description={`Stellar Secret Key`} placeholder={fetcher.data?.secret && fetcher.data?.secret} />
        <div className="flex justify-center">
          <SubmitButton />
        </div>
      </fetcher.Form>
      <div className="flex p-6">{fetcher.data && (JSON.stringify(fetcher.data))}</div>
    </div>
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
const ContractInput = ({ name, header, description, placeholder }: { name: string; header: string; description: string; placeholder?: string }) => {
  let [change, changeSet] = React.useState(false)
  return (
    <>
      <Text
        weight={6}
        className="font-medium text-lg"
      >
        <label className='font-display text-jacarta-700 mb-2 block dark:text-slate-800'>
          {header}
        </label>
      </Text>
      <p className='text-2xs mb-1'>
        {description}
      </p>
      <ContentEditable
        className={`border-b border-b-slate-800 focus:outline-none ${change && "bg-slate-500"}`}
        name={name}
        id={name}
        edit={true}
      >
        <Text className={`border-b  `} onChange={(event) => {
          changeSet(true)
          event.currentTarget.style.height = "1px";
          event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
        }}>
          {placeholder}
        </Text>
      </ContentEditable>
    </>

  );
};

const EditableHeader = ({ name, header }: { name: string; header: string; }) => {
  return (
    <ContentEditable
      className=" border-b border-b-red-500 py-3 focus:outline-none"
      name={name}
      id={name}
      edit={true}
    >
      <Text weight={7} className="font-black text-2xl">
        {header}
      </Text>
    </ContentEditable>
  );
};

const SubmitButton = ({ isSubmitting = false, isValid = true }) => {
  const disabled = isSubmitting || !isValid;
  return (
    <Button
      name="action"
      value="create"
      type="submit"
      color="default"
      aria-label="Create tweet"
      disabled={disabled}
    >
      Publish
    </Button>
  );
};
