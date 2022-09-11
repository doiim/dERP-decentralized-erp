import { ethers } from 'ethers'
import { Web3Storage } from 'web3.storage'

export default {
  install: (app, option) => {

    const storageClient = new Web3Storage({
        token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4MUMyMjNGNkYxODBGZTkyRUM4ODA0MEIzNjc5NjRGMmFjNjI1MTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4MzIxODgyNjQsIm5hbWUiOiJ3ZWIzUlAifQ.ng7M5CrwIDjUNtXuOzsLYLZ_ucMwBUIEV-IRqwccnOk',
    })

    const addFileIPFS = async (files) => {
        const cid = await storageClient.put(files)
        const filename = cid + '/' + files[0].name
        return filename
    }

    const addMetadataIPFS = async (jsonObject) => {
        var blob = new Blob([JSON.stringify(jsonObject)], {type: "application/json"});
        var file = new File([blob], "metadata.json");
        const cid = await storageClient.put([file])
        return cid + '/metadata.json'
    }

    const getIPFS = (cid) => {
        const gateway = 'https://ipfs.eth.aragon.network/ipfs/'
        return gateway+cid
    }

    app.provide('addFileIPFS', addFileIPFS)
    app.provide('addMetadataIPFS', addMetadataIPFS)
    app.provide('getIPFS', getIPFS)
  },
}
