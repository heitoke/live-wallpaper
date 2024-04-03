interface Props {
    label: string;

    onClick?(event: MouseEvent): void;
}

export const UIButton = ({ label, onClick }: Props) => {
    return <button class="ui-button"
        onClick={onClick}
    >
        <span>{label}</span>
    </button>
}