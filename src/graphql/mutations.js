/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHoot = /* GraphQL */ `
  mutation CreateHoot(
    $input: CreateHootInput!
    $condition: ModelHootConditionInput
  ) {
    createHoot(input: $input, condition: $condition) {
      id
      name
      description
      code
      createdAt
      updatedAt
    }
  }
`;
export const updateHoot = /* GraphQL */ `
  mutation UpdateHoot(
    $input: UpdateHootInput!
    $condition: ModelHootConditionInput
  ) {
    updateHoot(input: $input, condition: $condition) {
      id
      name
      description
      code
      createdAt
      updatedAt
    }
  }
`;
export const deleteHoot = /* GraphQL */ `
  mutation DeleteHoot(
    $input: DeleteHootInput!
    $condition: ModelHootConditionInput
  ) {
    deleteHoot(input: $input, condition: $condition) {
      id
      name
      description
      code
      createdAt
      updatedAt
    }
  }
`;
