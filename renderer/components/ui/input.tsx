export type InputType = 'text' | 'password' | 'number';

interface Props {
    type: InputType;
    value?: string;
}

export const UIInput = ({ type = 'text', value }: Props) => {
    return <label class="ui-input">
        <input type={type} value={value}/>
    </label>
}