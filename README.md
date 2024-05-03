[CoffeeTown Demo](https://ethglobal.com/showcase/coffeetown-92mma) 

Frontend is on the Dev Branch. [Figma File](https://www.figma.com/file/VFHQPis3CdzrcYtUpTImAN/CoffeeTown-UI-Designs?type=design&node-id=0-1&mode=design) © Designed By Harendra Shakya

### Project Description

CoffeeTown is a platform that was born out of a love for coffee and the web3 community. We understand that web3 creators and artists work tirelessly to bring their work to life and we wanted to create a space where they can connect with their fans in a meaningful way. Our platform allows creators to set up a profile and offer membership options, where fans can support them by buying them a virtual coffee or subscribing to their membership program. This not only helps creators financially, but it also creates a sense of community and connection between the creator and their fans. We believe that a cup of coffee can bring people together, and that's exactly what we hope to do with CoffeeTown. Whether it's a creator having a virtual coffee with their fans, or fans supporting their favorite creator by buying them a coffee, we want to bring the community closer together. There was a need for CoffeTown as there are many tipping platforms but none of them is a proper platform for web3 creators that allows fans to support their favorite creators using crypto in a meaningful way. We believe that with CoffeeTown, creators can continue to create, and fans can continue to support the art and content they love. So come, join us at CoffeeTown, and let's have a cup of coffee together.

### How it's Made

We built this project using Solidity for writing the smart contract logic and Nextjs.js/React, Ethers, Chakra UI, Tailwindcss for the front-end web development. The project also used the Web3 Storage SDK to make it possible to upload ipfs profile and profile pic to IPFS. Though our smart contracts we allow users to create IPFS Profiles, IPFS Profile is a contract that handles buying of coffee, it also allows a user to add a CID as well as allowing them to construct and then upload a profile to ipfs. We can then add that profile to the user's profile contract for later rendering on frontend. Contract includes a factory, which creates IPFSProfile contracts for each user, the ipfs profile contract emits events when it receives any msg with value over 0.01 tfil. Using the web3storage api - we pass an image file, and receive a CID, enter that into a JSON file with our profile name and description, and upload that to IPFS via web3storage, and receive a "profile" CID. Then we need to add this profile CID to our ipfsprofile contract. We can check the factory address to see if we have a profile, if we do not we can create one. Query the factory contract for our profile contract's address - we can then add the CID from the ipfs steps to that newly created IPFSProfile contract. This contract is payable and emits events when it receives any $$$. From there we can render the profile by calling getCID on the ipfs profile contract.

#### Tech Stack
1. Solidity
2. Next.js/React
3. Ethers
4. Chakra UI
5. Tailwind CSS
6. Web3 Storage SDK
7. Wagmi
