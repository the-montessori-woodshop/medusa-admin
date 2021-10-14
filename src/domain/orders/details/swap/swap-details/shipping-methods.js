import React from "react"
import { Box, Text, Flex } from "rebass"
import { ReactComponent as WarningIcon } from "../../../../../assets/svg/warning.svg"
import { isEmpty } from "lodash"
import { displayAmount } from "../../../../../utils/prices"

const formatDecimalAndCurrency = (amount, currency) => {
  const fixed = displayAmount(currency, amount, 2)

  return `${fixed} ${currency.toUpperCase()}`
}

const SwapShippingMethods = ({
  shipping_methods = [],
  taxRate,
  currency,
  fontColor,
}) => {
  return (
    <>
      {!isEmpty(shipping_methods) ? (
        shipping_methods.map(method => (
          <Box key={method._id}>
            <Box>
              <Text fontSize={12} color="#454B54">
                {method.shipping_option ? (
                  <>
                    {method.shipping_option.name} -{" "}
                    {formatDecimalAndCurrency(
                      method.price * (1 + taxRate / 100),
                      currency
                    )}
                  </>
                ) : (
                  <Flex alignItems="center">
                    <WarningIcon />
                    <Text ml={2} color={fontColor}>
                      Order was shipped with a now deleted option
                    </Text>
                  </Flex>
                )}
              </Text>
            </Box>
          </Box>
        ))
      ) : (
        <Text fontSize={12} color={fontColor}>
          No shipping for this order
        </Text>
      )}
    </>
  )
}

export default SwapShippingMethods
