import { ethers } from 'ethers'
import { Web3Storage } from 'web3.storage'

export default {
  install: (app, option) => {

    const storageClient = new Web3Storage({
        token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4MUMyMjNGNkYxODBGZTkyRUM4ODA0MEIzNjc5NjRGMmFjNjI1MTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4MzIxODgyNjQsIm5hbWUiOiJ3ZWIzUlAifQ.ng7M5CrwIDjUNtXuOzsLYLZ_ucMwBUIEV-IRqwccnOk',
    })

    const addIpfs = async () => {
        if (!this.files.length || this.uploading) return
        this.uploaded = []
        const cid = await storageClient.put(this.files)
        const gateway = 'https://ipfs.eth.aragon.network/ipfs/'
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files.item(i)
          this.uploaded.push(gateway + cid + '/' + file.name)
        }
        return this.uploaded
      } catch (err) {
        return { error: 'Error uploading file to IPFS!' }
      }
    }

    const getIpfs = async () => {

    }

    const getWalletProvider = () => provider

    app.provide('connectWallet', connect)
    app.provide('disconnectWallet', disconnect)
    app.provide('getWalletProvider', getWalletProvider)
    app.provide('getWalletSigner', getWalletSigner)
    app.provide('getWalletAccount', getWalletAccount)
  },
}
