import { Card, CardProps } from '@mui/material';
import './Card.css';

const StyledCard = (props: CardProps) => <Card {...props} className={`Card ${props.className}`} />;

export default StyledCard;
