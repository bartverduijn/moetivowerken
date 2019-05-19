import styled from 'styled-components';

const FormStyles = styled.div`
    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
    fieldset {
        z-index: 1;
        border: none;
        display: flex;
        flex-direction: column;
        h2 {
            line-height: 1.2;
        }
        label {
            text-transform: uppercase;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: ${props => props.theme.grey};
        }
        input {
            letter-spacing: 0;
            font-size: 1.5rem;
            border: 1px solid ${props => props.theme.grey};
            padding: 2rem 1.5rem;
            border-radius: 0.5rem;
            background: ${props => props.theme.greyLighter};
            color: ${props => props.theme.greyDark};
            margin-bottom: 2rem;
            width: 100%;
        }
        input::placeholder {
            color: ${props => props.theme.grey};
        }
        button {
            margin-top: 1rem;
            width: 100%;
            background: ${props => props.theme.red};
            color: ${props => props.theme.white};
            border: none;
            border-radius: 0.5rem;
            padding: 2rem 1.5rem;
            font-weight: 700;
        }
    }
    fieldset[disabled] {
        opacity: 0.5;
    }
`;

export default FormStyles;
