import { IButton } from './IButton';

export const Button = ({ onClick, text }: IButton): JSX.Element => {
  return <button onClick={onClick}>Hi {text}</button>;
};
