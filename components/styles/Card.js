import styled from 'styled-components';

const Card = styled.div`
    margin: 5rem auto;
    background: ${props => props.theme.white};
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.3);
    max-width: 400px;
    position: relative;
`;

export default Card;
