import style from "./style.module.css";

export interface IForm {
    label: string;
    type: string;
    placeholder: string;
    value: string | number | any;
    onChange?: any;
    onKeyPress?: any;
    disabled?: boolean;
    required?: boolean;
}

export default function Form({
    label,
    type,
    placeholder,
    value,
    onChange,
    onKeyPress,
    disabled,
    required,
}: IForm) {
    return (
        <form className={style.form}>
            <label className={style.label}>{label}</label>
            <input className={style.input}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                disabled={disabled}
                required={required}
            />
        </form>
    );
}
