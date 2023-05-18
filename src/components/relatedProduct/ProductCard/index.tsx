import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Image,
    Link,
    Skeleton,
    Stack,
    StackProps,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { Rating } from '../Rating'
  import { FavouriteButton } from '../FavouriteButton'
  import { PriceTag } from '../PriceTag'
  import { Product } from '../utils'
  
  interface Props {
    product: Product
    rootProps?: StackProps
  }
  
  export const ProductCard = (props: Props) => {
    const { product, rootProps } = props
    const { name, imageUrl, price, salePrice, rating } = product
    return (
      <Stack spacing={{ base: '4', md: '5' }} {...rootProps}>
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={imageUrl}
              alt={name}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={{ base: 'md', md: 'xl' }}
            />
          </AspectRatio>
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
              {name}
            </Text>
            <PriceTag price={price} salePrice={salePrice} currency="USD" />
          </Stack>
          <HStack>
            <Rating defaultValue={rating} size="sm" />
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              12 Reviews
            </Text>
          </HStack>
        </Stack>
      </Stack>
    )
  }