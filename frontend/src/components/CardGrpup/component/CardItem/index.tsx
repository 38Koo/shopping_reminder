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
import { CardDataType } from "../../types/CardItemType";

type CardItemProps = {
  data: CardDataType;
};

export const CardItem = ({ data }: CardItemProps) => {
  return (
    <GridItem minW="250px">
      <Card size="md" bgColor="white" height="350px" position="relative">
        <CardHeader>
          <Heading as="h3" size="md">
            {data.item.itemName}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>
            残り
            <Box as="span" fontSize="48px" fontWeight="bold">
              {data.logSummary.DaysLeftUntilNextPurchase === -1
                ? "?"
                : data.logSummary.DaysLeftUntilNextPurchase}
            </Box>
            日
          </Text>
          <List>
            <ListItem>在庫: {data.item.stockCount}</ListItem>
            <ListItem>平均購入価格: {data.logSummary.AveragePrice}</ListItem>
            <ListItem>平均消費日数: {data.logSummary.AverageConsume}</ListItem>
          </List>
        </CardBody>
        {/* // NOTE Add Itemボタンのコンテナと重なった時に、重なった部分が押下できなくなるのでzindexを追加*/}
        <CardFooter position="absolute" bottom={1} right={1} zIndex={500}>
          <Link href={`/edit/${data.item.UserItemID}`}>
            <Button as="span" bg="primary" color="white">
              Edit
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </GridItem>
  );
};
