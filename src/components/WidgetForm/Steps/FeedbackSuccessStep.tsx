import CloseButton from '../../CloseButton';
import success from '../../../assets/success.svg';

interface SuccessProps {
  resetFeedback: () => void;
}

function FeedbackSuccessStep({ resetFeedback }: SuccessProps) {
  return (
    <>
      <header className=''>
        <CloseButton />
      </header>
      <div className='flex flex-col items-center py-10  w-[304px]'>
        <img src={success} alt='sucesso' />
        <span className='text-xl mt-2'>Agradecemos o Feedback</span>
        <button
          className='py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm hover:bg-zinc-700 focos:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-zinc-900  focus:ring-brand-500 transition-colors '
          onClick={resetFeedback}
        >
          Quero enviar outro
        </button>
      </div>
    </>
  );
}

export default FeedbackSuccessStep;
