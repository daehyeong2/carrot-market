interface IFormButtonProps {
  isLoading: boolean;
  text: string;
}

const FormButton = ({ isLoading, text }: IFormButtonProps) => {
  return (
    <button
      disabled={isLoading}
      className="primary-btn h-10 font-semibold disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {isLoading ? "로딩 중.." : text}
    </button>
  );
};

export default FormButton;
