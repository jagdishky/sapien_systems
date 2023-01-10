import { gql } from '@apollo/client';
import { GQL_TYPE_FITNESS_DISCIPLINES } from '../types';

export const GET_FITNESS_DISCIPLINES_LIST = gql`
  query ${GQL_TYPE_FITNESS_DISCIPLINES}
  {
    ${GQL_TYPE_FITNESS_DISCIPLINES}
    {
      data{
        id
        attributes{
          disciplinename
          Image_URL
        }
      }
    }
  }
`;
