"use client";

import prisma from "@/lib/prisma";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { signup } from "@/utils/login-utils";
import { UserInfo } from "@/app/types";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, ListboxSelectedOption, Input } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { majors } from "@/app/constants";
import "../app/signup/styles.css"

interface CredentialsFormProps {
	csrfToken?: string;
	buttonText: string;
}

export function CredentialsFormDark(props: CredentialsFormProps) {
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);

		// switch (props.buttonText) {
		// 	case "Sign up":
		// 		const user = await prisma.user.create({
		// 			data: {
		// 				email: data.get("email") as string,
		// 				password: bcrypt.hashSync(data.get("password") as string, 10),
		// 			},
		// 		});
		// 		break;
		// 	case "Sign in":
		// }

		// const signInResponse = await signIn("credentials", {
		// 	email: data.get("email"),
		// 	password: data.get("password"),
		// 	redirect: false,
		// });

		// if (signInResponse && !signInResponse.error) {
		// 	redirect("/profile/edit");
		// } else {
		// 	setError("Your email or password was incorrect.");
		// }

        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const first_name = data.get("first name") as string;
        const last_name = data.get("last name") as string;
        const major = data.get("major") as string;
        const confirm_password = data.get("confirm password") as string;
        // Do something when password and confirm_password do not match.
        // Can have a function that deals with this and shows appropraite message.
        // LETS HAVE A STATE MESSAGE THAT IS EMPTY STRING INITIALLY AND SHOWS THE MESSAGE TO USER IN VARIOUS SCENARIOS SUCH AS 'PASSWORDS DONT MATCH', ETC
        const userData: UserInfo = {email:email,password:password,first_name:first_name,last_name:last_name,major:major};

        
            const response: any = await signup(userData);
            if(response.status !== 200){// Response not Okay so the status is 401
                setError(response.message);
            }
            // TASK: DO SOMETHING ON SUCCESSFUL SIGNUP
        
	};

	return (
		<form className="w-full bg-blue rounded-sm" onSubmit={handleSubmit}>
            <div className="flex">
                <Input
                    type="name" // should these just be names? ANS: "text" should be fine
                    name="first name"
                    placeholder="First Name"
                    required
                    className="p-4 my-2 rounded-md w-full text-white focus"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
                />
                <Input
                    type="name"
                    name="last name"
                    placeholder="Last Name"
                    required
                    className="p-4 my-2 rounded-md w-full text-white focus"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
                />
            </div>
			<Input
				type="email"
				name="email"
				placeholder="Email (user@ucsd.edu)"
				required
				className="p-4 my-2 rounded-md w-full text-white focus"
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					
				  }}
			/>

            <MajorsList/>
			<Input
				type="password"
				name="password"
				placeholder="Password"
				required
				className="p-4 my-2 rounded-md w-full text-white focus"
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
			/>
			<Input
				type="password"
				name="confirm password"
				placeholder="Confirm Password"
				required
				className="p-4 my-2 rounded-md w-full text-white focus"
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
			/>
				{/* <Input
				type="major" // what should this type be?
				name="major"
				placeholder="Major (Philosophical Engineering)"
				required
				className="p-4 my-2 rounded-md w-full text-white focus"
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
			/> */}
                
				{/*
				<Input 

				//**FIGURE OUT HOW TO FIX**
				//If this is here, it becomes too long and the page looks broken.

				
				type="graduation"
				name="graduation"
				placeholder="Graduation Year (2027)"
				required
				className="p-4 my-2 rounded-md w-full text-white focus"
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
			/>
				*/}
			
			<button
				type="submit"
				className="block bg-black bg-opacity-50 p-4 mt-4 rounded-lg m-auto text-white font-semibold hover:bg-white hover:shadow-2xl shadow-blue-400 hover:text-black transition" 
				// style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
			>
				{props.buttonText}
			</button>

            <div>
                {error}
            </div>
		</form>
	);
}

/**
 * 
 * @returns - List of majors in a box
 */
function MajorsList(){
    const [selectedMajor, setSelectedMajor] = useState<any>("Major");

    return (
        <div>
        <Listbox value={selectedMajor} onChange={setSelectedMajor} name="major">
            <ListboxButton 
                className="p-4 my-2 rounded-md w-full text-white/60 focus" 
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', textAlign:'left' }}
                >
                    <div className="flex">
                        {selectedMajor}
                        <ChevronDownIcon
                            className=" ml-auto w-6 h-6 group pointer-events-none top-2.5 right-2.5 fill-white/60"
                            aria-hidden="true"
                            />
                    </div>
                </ListboxButton>
            <ListboxOptions 
                anchor={'bottom'}
                transition
                className={clsx(
                'w-[var(--button-width)] rounded-xl border border-white/100 bg-black/100 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                )}
            >
                {majors.map((major,index) => (
                    <ListboxOption 
                        key={index} 
                        value={major} 
                        className="group flex text-white/60 cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10 "
                    >
                        <CheckIcon className="invisible w-6 h-6 size-1 fill-white/60 group-data-[selected]:visible" />
                        {major}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
        </div>
    );
}