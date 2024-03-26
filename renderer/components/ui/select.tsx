export interface Item {
    label: string;
    value?: string;
}

interface Props {
    items: Array<Item>;
    style?: string;
    onSelect?(value: string, target: HTMLSelectElement, event: Event): void;
}

export const UISelect = ({ items, style = '', onSelect = () => {} }: Props) => {
    const onChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;

        onSelect(target.value, target, event);
    }

    return <select class="ui-select" style={style}
        onChange={onChange}
    >
        {items.map((item, idx) => {
            return <option value={item.value}>{item.label}</option>
        })}
    </select>
}