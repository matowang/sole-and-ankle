import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  console.log(
    variant !== "default",
    {
      "on-sale": "Sale",
      "new-release": "Just Released!",
    }[variant]
  );

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <DescriptionWrapper>
          <Row>
            <Name>{name}</Name>
            <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          </Row>
          <Row
            style={{
              textAlign: "right",
            }}
          >
            <Price isSale={!!salePrice}>{formatPrice(price)}</Price>
            {salePrice && (
              <>
                <br />
                <SalePrice>{salePrice}</SalePrice>
              </>
            )}
          </Row>
        </DescriptionWrapper>
        {variant !== "default" && (
          <Tag
            style={{
              "--background-color": {
                "on-sale": COLORS.primary,
                "new-release": COLORS.secondary,
              }[variant],
            }}
          >
            {
              {
                "on-sale": "Sale",
                "new-release": "Just Released!",
              }[variant]
            }
          </Tag>
        )}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(p) => (p.isSale ? "line-through" : "auto")};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const Tag = styled.div`
  background-color: var(--background-color);
  padding: 10px;
  position: absolute;
  top: 12px;
  right: -4px;
  border-radius: 2px;
  font-weight: 700;
  color: ${COLORS.white};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
