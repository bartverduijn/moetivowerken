import styled from 'styled-components';

const Toggle = styled.div`
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    /* opacity: 0; */
    label {
        cursor: pointer;
        position: relative;
        padding: 6px 70px 6px 0;
        &:before {
            content: '';
            display: block;
            position: absolute;
            width: 40px;
            height: 16px;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            border-radius: 7px;
            background: ${props => props.theme.grey};
            z-index: 0;
        }
        &:after {
            content: '';
            display: block;
            position: absolute;
            height: 22px;
            width: 22px;
            border-radius: 11px;
            top: 50%;
            transform: translate(-18px, -50%);
            right: 0;
            background: ${props => props.theme.greyLighter};
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
            z-index: 1;
            transition: transform 0.1s cubic-bezier(0, 0, 0.3, 1);
        }
    }
    input {
        opacity: 0;
        position: absolute;
        &:checked + .toggle {
            &:before {
                background: ${props => props.theme.red};
            }
            &:after {
                transform: translate(0, -50%);
            }
        }
    }
`;

export default Toggle;
