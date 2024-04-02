import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function FormCard(props) {

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm();

    const onSubmit = (data => {
        console.log(data);
        props.getInfo(data);
        props.getShow(data ? "true" : "false")
    });

    const [value, setValue] = useState();

    return (
        <form 
            id="cardForm" 
            className="formData" 
            onSubmit={handleSubmit(onSubmit)}
        >
            <span>Business Card</span>

            <div className='inputArea'>
                <input 
                    {...register("fullName", { required: true, maxLength: 25 })} 
                    aria-invalid={errors.fullName ? "true" : "false"}
                    type="text" 
                    placeholder='Full Name' 
                />
                {errors.fullName?.type === "required" && (
                    <span role="alert">Full name is required</span>
                )}
            </div>
            
            <div className="inputArea">
                <input 
                    {...register("company", { required: true, maxLength: 25 })} 
                    aria-invalid={errors.company ? "true" : "false"}
                    type="text"
                    placeholder='Company Name'
                />
                {errors.company?.type === "required" && (
                    <span role='alert' >Company name required</span>
                )}
            </div>
            
            <div className="inputArea">
                <input 
                    {...register("email", { required: true, pattern: /^[A-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                    type="text" 
                    placeholder='E-mail' 
                />
                {errors.email?.type === "required" && (
                    <span role='alert' >Invalid e-mail address</span>
                )}
            </div>
            
            <div className="inputArea">
                <PhoneInput 
                    {...register("number", {required: true})} 
                    international
                    value={value} 
                    onChange={setValue}
                    placeholder='Phone Number' 
                    defaultCountry='MZ'
                    limitMaxLength={true}
                />
                {errors.phone?.type === "required" && (
                    <span role='alert'>Type a valid phone number</span>
                )}
            </div>

        </form>
    );
}
