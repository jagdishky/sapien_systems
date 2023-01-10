import { gql } from '@apollo/client';
import { GQL_DATA_TYPE } from '../../utility/constants';
import { GQL_TYPE_FITNESS_PACKAGE, GQL_TYPE_FITNESS_PACKAGES } from '../types';

export const GET_FITNESS_PACKAGE_LIST = gql`
  query ${GQL_TYPE_FITNESS_PACKAGES}
  {
    ${GQL_TYPE_FITNESS_PACKAGES}
    {
      data{
        id
        attributes{
          packagename
          tags
          level
          aboutpackage
          intropicture
          introvideo
          grouponline
          ptonline
          ptoffline
          recordedclasses
          groupoffline
          classsize
          expiry_date
          Status
          fitnesspackagepricing
          classsize
          restdays
          bookingleadday
          duration
          Ptclasssize
          mode
          benefits
        }
      }
    }
  }
`;

export const GET_FITNESS_PACKAGE_DETAIL = gql`
  query ${GQL_TYPE_FITNESS_PACKAGE}
  (
    $id: ${GQL_DATA_TYPE.ID}
  )
  {
    ${GQL_TYPE_FITNESS_PACKAGE}
    (
      id: $id
    )
    {
      data{
        id 
        attributes{
          packagename
          tags
          level
          aboutpackage
          intropicture
          introvideo
          grouponline
          groupoffline
          ptonline
          ptoffline
          recordedclasses
          classsize
          expiry_date
          Status
          fitnesspackagepricing
          classsize
          restdays
          bookingleadday
          duration
          Ptclasssize
          mode
          benefits
          
        }
      }
    }
  }
`;