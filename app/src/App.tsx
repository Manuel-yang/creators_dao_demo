import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import BasicCard from './conponents/Card';
import { getProfilePda, getPostPda } from './utils/pdas';
import { createPostApi, deletePostApi, getProgram, getProvider } from './utils/utils';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
      <Context>
        <Content />
      </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
};

const Content: FC = () => {
  const [input, setInput] = useState("")
  const [postArray, setPostArray] = useState<any[]>([])


  const wallet = useAnchorWallet()

  useEffect(() => {
    init()
  }, [wallet]) 

  async function init() {
    const provider = getProvider(wallet!)
    if(provider) {
      const program = getProgram(provider)
      const profilePda = await getProfilePda(provider!.publicKey, program.programId)
      let postNonce
      try {
        postNonce = (await program.account.profilePda.fetch(profilePda[0])).postsNonce
        if (postNonce) {
          for (let i = 0; i < Number(postNonce); i++) {
            const tempPostPda = await getPostPda(i, program.programId)
            let content: any
            try {
              content = (await program.account.postPda.fetch(tempPostPda[0]))
              setPostArray(prevPostArray => [...prevPostArray, {postNonce: Number(content.postNonce), content: content.content}]);
            } catch (error: any) {
              console.log(error)
            }
          }
        }
      } catch(error: any) {
        console.log(error)
      }
    }
  }

  async function createPost() {
    const postNonce = await createPostApi(wallet!, input)
    setPostArray([...postArray, {nonce: Number(postNonce), content: input}])
  }

  async function deletePost(postNonce: number) {
    await deletePostApi(wallet!,postNonce)
    setPostArray(prevArray => {
      return prevArray.filter((e) => e.postNonce !== postNonce);
    });
  }

  return (
    <div className="App">
      <WalletMultiButton />
      <div>
        <Stack direction="row" spacing={2} className='InputBlock'>
          <TextField onChange={(event) => setInput(event.target.value)} id="outlined-basic" label="Text" variant="outlined" />
          <Button onClick={createPost} variant="contained">send</Button>
        </Stack>
        
        <Stack spacing={2} className='CardBlock'>
          {postArray.map((post, index) => (
            <BasicCard key={index} post={post} deletePost={deletePost}/>
          ))}
        </Stack>
      </div>
    </div>
  );
};

