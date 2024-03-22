// ./schema/duration/DurationInput.tsx

import { Box, Stack, Button, Flex, Grid } from '@sanity/ui'
import { ObjectInputMember, ObjectInputProps } from 'sanity'

type Address = {
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zip: string
  // country?: string
}

export function AddressInput(props: ObjectInputProps<Address>) {
  const { members } = props

  const street = members.find(
    (member) => member.kind === 'field' && member.name === 'street',
  )
  const city = members.find(
    (member) => member.kind === 'field' && member.name === 'city',
  )
  const state = members.find(
    (member) => member.kind === 'field' && member.name === 'state',
  )
  const zip = members.find(
    (member) => member.kind === 'field' && member.name === 'zip',
  )

  // if (!addressLine1 || !city || !state || !zip) {
  //   console.error(
  //     `Missing "Address Line 1" "end" member in DurationInput: "${props.schemaType.name}"`,
  //   )
  //   return props.renderDefault(props)
  // }

  // Pass along functions to each member so that it knows how to render
  const renderProps = {
    renderField: props.renderField,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview,
  }

  return (
    <Stack space={3}>
      <Box flex={1}>
        {street && <ObjectInputMember member={street} {...renderProps} />}
      </Box>
      <Grid columns={[1, 1, 4]} gap={3}>
        <Box column={[1, 1, 2]}>
          {city && <ObjectInputMember member={city} {...renderProps} />}
        </Box>
        <Box column={[1, 1, 1]}>
          {state && <ObjectInputMember member={state} {...renderProps} />}
        </Box>
        <Box column={[1, 1, 1]}>
          {zip && <ObjectInputMember member={zip} {...renderProps} />}
        </Box>
      </Grid>
    </Stack>
  )
}
