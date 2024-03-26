interface Props {
    label: string;
}

export const UIButton = ({ label }: Props) => {
    return <button class="ui-button">
        <span>{label}</span>
    </button>
}