import theme from '@/utils/theme';
import { styled, Stack, Typography, Button } from '@mui/material';

interface SelectionBlockProps {
  pages: interactivePagesData[];
  block: Selection2BlockData | Selection4BlockData;
  handleSelectBlockData: (selectionResult: string) => void;
}

type SelectionAnswerResult = { result: string; value: string };

const isSelection4BlockData = (
  block: Selection2BlockData | Selection4BlockData
): block is Selection4BlockData => {
  return block.type === 'Selection4BlockData';
};

const SelectionBlock = ({
  block,
  handleSelectBlockData
}: SelectionBlockProps) => {
  const selectionAnswers = isSelection4BlockData(block)
    ? [
        { result: block.gotoPageA, value: block.answerA },
        { result: block.gotoPageB, value: block.answerB },
        { result: block.gotoPageC, value: block.answerC },
        { result: block.gotoPageD, value: block.answerD }
      ]
    : [
        { result: block.gotoPageA, value: block.answerA },
        { result: block.gotoPageB, value: block.answerB }
      ];

  const handleClickAnswer = (page: SelectionAnswerResult) => {
    handleSelectBlockData(page.result);
  };

  return (
    <Wrapper>
      <SelectionWrapper>
        <TitleWrapper>
          <Title>퀴즈</Title>
          <Question>{block.title}</Question>
        </TitleWrapper>
        <ButtonWrapper>
          {selectionAnswers.map((result: SelectionAnswerResult) => (
            <StyledButton
              key={result.value}
              variant="contained"
              onClick={() => {
                handleClickAnswer(result);
              }}
              style={result.value ? { display: 'block' } : { display: 'none' }}
            >
              {result.value}
            </StyledButton>
          ))}
        </ButtonWrapper>
      </SelectionWrapper>
    </Wrapper>
  );
};

export default SelectionBlock;

const Wrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: '3.5rem',
  maxWidth: '466px',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.custom.light
}));

const TitleWrapper = styled(Stack)(() => ({}));

const SelectionWrapper = styled(Stack)(() => ({
  padding: '2rem'
}));

const Title = styled(Typography)(() => ({
  textAlign: 'center',
  fontWeight: 600
}));

const Question = styled(Typography)(() => ({
  margin: '1rem 0',
  paddingBottom: '1rem',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const ButtonWrapper = styled(Stack)(() => ({}));

const StyledButton = styled(Button)(() => ({
  margin: '.5rem 0',
  padding: '.8rem',
  borderRadius: '2rem',
  color: '#000000',
  border: '1px solid #736dee',
  fontWeight: 'bold',

  '&:hover': {
    backgroundColor: '#736dee !important',
    color: '#ffffff  !important'
  }
}));
