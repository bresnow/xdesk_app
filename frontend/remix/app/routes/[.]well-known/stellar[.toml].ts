import type { LoaderArgs } from "@remix-run/node"
import { Config } from "../../../utils/config"
export async function loader(args: LoaderArgs) {
  const content = `
#TODO: Finish STELLAR TOML
VERSION="0.0.1"

NETWORK_PASSPHRASE="Public Global Stellar Network ; September 2015"
FEDERATION_SERVER="https://${Config.FRONTEND_DOMAIN}/federation"
TRANSFER_SERVER="https://${Config.FRONTEND_DOMAIN}"
SIGNING_KEY="${Config.ISSUER_ID}"
HORIZON_URL="${Config.HORIZON_URL}"
ACCOUNTS=[
"GD5DJQDDBKGAYNEAXU562HYGOOSYAEOO6AS53PZXBOZGCP5M2OPGMZV3",
"GAENZLGHJGJRCMX5VCHOLHQXU3EMCU5XWDNU4BGGJFNLI2EL354IVBK7",
"GAOO3LWBC4XF6VWRP5ESJ6IBHAISVJMSBTALHOQM2EZG7Q477UWA6L7U"
]

[DOCUMENTATION]
ORG_NAME="Organization Name"
ORG_DBA="Organization DBA"
ORG_URL="https://${Config.FRONTEND_DOMAIN}/"
ORG_LOGO="https://${Config.FRONTEND_DOMAIN}/logo.png"
ORG_DESCRIPTION="Description of issuer"
ORG_PHYSICAL_ADDRESS="123 Sesame Street, New York, NY 12345, United States"
ORG_PHYSICAL_ADDRESS_ATTESTATION="https://www.domain.com/address_attestation.jpg"
ORG_PHONE_NUMBER="1 (123)-456-7890"
ORG_PHONE_NUMBER_ATTESTATION="https://www.domain.com/phone_attestation.jpg"
ORG_KEYBASE="accountname"
ORG_TWITTER="orgtweet"
ORG_GITHUB="orgcode"
ORG_OFFICIAL_EMAIL="support@domain.com"

[[PRINCIPALS]]
name="Jane Jedidiah Johnson"
email="jane@domain.com"
keybase="crypto_jane"
twitter="crypto_jane"
github="crypto_jane"
id_photo_hash="be688838ca8686e5c90689bf2ab585cef1137c999b48c70b92f67a5c34dc15697b5d11c982ed6d71be1e1e7f7b4e0733884aa97c3f7a339a8ed03577cf74be09"
verification_photo_hash="016ba8c4cfde65af99cb5fa8b8a37e2eb73f481b3ae34991666df2e04feb6c038666ebd1ec2b6f623967756033c702dde5f423f7d47ab6ed1827ff53783731f7"

[[CURRENCIES]]
code="USD"
issuer="GCZJM35NKGVK47BB4SPBDV25477PZYIYPVVG453LPYFNXLS3FGHDXOCM"
display_decimals=2

[[CURRENCIES]]
code="BTC"
issuer="GAOO3LWBC4XF6VWRP5ESJ6IBHAISVJMSBTALHOQM2EZG7Q477UWA6L7U"
display_decimals=7
anchor_asset_type="crypto"
anchor_asset="BTC"
redemption_instructions="Use SEP6 with our federation server"
collateral_addresses=["2C1mCx3ukix1KfegAY5zgQJV7sanAciZpv"]
collateral_address_signatures=["304502206e21798a42fae0e854281abd38bacd1aeed3ee3738d9e1446618c4571d10"]

# asset with meta info
[[CURRENCIES]]
code="GOAT"
issuer="GD5T6IPRNCKFOHQWT264YPKOZAWUMMZOLZBJ6BNQMUGPWGRLBK3U7ZNP"
display_decimals=2
name="goat share"
desc="1 GOAT token entitles you to a share of revenue from Elkins Goat Farm."
conditions="There will only ever be 10,000 GOAT tokens in existence. We will distribute the revenue share annually on Jan. 15th"
image="https://static.thenounproject.com/png/2292360-200.png"
fixed_number=10000

[[VALIDATORS]]
ALIAS="domain-au"
DISPLAY_NAME="Domain Australia"
HOST="core-au.domain.com:11625"
PUBLIC_KEY="GD5DJQDDBKGAYNEAXU562HYGOOSYAEOO6AS53PZXBOZGCP5M2OPGMZV3"
HISTORY="http://history.domain.com/prd/core-live/core_live_001/"

[[VALIDATORS]]
ALIAS="domain-sg"
DISPLAY_NAME="Domain Singapore"
HOST="core-sg.domain.com:11625"
PUBLIC_KEY="GAENZLGHJGJRCMX5VCHOLHQXU3EMCU5XWDNU4BGGJFNLI2EL354IVBK7"
HISTORY="http://history.domain.com/prd/core-live/core_live_002/"

[[VALIDATORS]]
ALIAS="domain-us"
DISPLAY_NAME="Domain United States"
HOST="core-us.domain.com:11625"
PUBLIC_KEY="GAOO3LWBC4XF6VWRP5ESJ6IBHAISVJMSBTALHOQM2EZG7Q477UWA6L7U"
HISTORY="http://history.domain.com/prd/core-live/core_live_003/"

# optional extra information for humans
# Useful place for anchors to detail various policies and required info

###################################
# Required compliance fields:
#      name=<recipient name>
#      addr=<recipient address>
# Federation Format:
#        <phone number>*anchor.com
#        Forwarding supported by sending to: forward*anchor.com
#           forward_type=bank_account
#           swift=<swift code of receiving bank>
#           acct=<recipient account number at receiving bank>
# Minimum Amount Forward: $2 USD
# Maximum Amount Forward: $10000 USD"
`
  return Toml(content, 200)
};


export function Toml(
  content: string,
  init: number | ResponseInit = {}
): Response {
  let responseInit = typeof init === "number" ? { status: init } : init;

  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/plain; charset=utf-8");
  }

  return new Response(content, {
    ...responseInit,
    headers,
  });
}