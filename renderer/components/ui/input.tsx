import { type Reactive } from 'hywer/jsx-runtime';


export type InputType = 'text' | 'password' | 'number';

export type InputEvent = Event & { target: HTMLInputElement };

interface Props {
    type?: InputType;
    value?: Reactive<string> | string;
    onInput?(event: InputEvent): void;
    onUpdate?(value: string): void;
}

export const UIInput = ({ type = 'text', value, onInput = () => {}, onUpdate = () => {} }: Props) => {
    return <label class="ui-input">
        <input type={type} value={value}
            onInput={(event: InputEvent) => {
                onInput(event);
                onUpdate(event.target.value);
            }}
        />
    </label>
}