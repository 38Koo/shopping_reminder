import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  Heading,
  List,
  ListItem,
  Text,
} from "@yamada-ui/react";
import Link from "next/link";
import { CardItemType } from "../../types/CardItemType";

type CardItemItem = {
  item: CardItemType;
};

export const CardItem = ({ item }: CardItemItem) => {
  return (
    <GridItem minW="250px">
      <Card size="md" bgColor="white" height="350px" position="relative">
        <CardHeader>
          <Heading as="h3" size="md">
            {item.itemName}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            残り
            <Box as="span" fontSize="48px" fontWeight="bold">
              5
            </Box>
            日
          </Text>
          <List>
            {/* // TODO: dataに置き換え */}
            <ListItem>在庫: 1</ListItem>
            <ListItem>買替日数/個: 30日</ListItem>
            <ListItem>最終購入日: 2024/01/28</ListItem>
            <ListItem>在庫切れ予定日: 2024/02/28</ListItem>
          </List>
        </CardBody>
        <CardFooter position="absolute" bottom={1} right={1}>
          <Link href={`/edit/${item.UserItemID}`}>
            <Button as="span" bg="primary" color="white">
              Edit
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </GridItem>
  );
};