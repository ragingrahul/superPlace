import { CredentialType, IDKitWidget, ISuccessResult, solidityEncode } from '@worldcoin/idkit'
import { useAccount } from 'wagmi';

const WorldID = () => {
  const { address } = useAccount()

  const onSuccess = (result: ISuccessResult) => {
    // performing a write function here due to time constraints

    console.log(result);
  };

  return (
    <IDKitWidget
      app_id="app_staging_f9f6947352fe2f25b2a7b800845dcf57" // obtained from the Developer Portal
      action="draw"
      signal={address} // only for on-chain use cases, this is used to prevent tampering with a message
      onSuccess={onSuccess}
      // no use for handleVerify, so it is removed
      credential_types={['orb' as CredentialType]} // we recommend only allowing orb verification on-chain
      enableTelemetry
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
    // <div>
    //   <button onClick={()=> console.log("Test")} className="relative inline-block text-lg group">
    //     <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
    //       <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
    //       <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
    //       <span className="relative flex">
    //       <svg
    //           width="25"
    //           height="25"
    //           viewBox="0 0 25 25"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //       >
    //           <path
    //           d="M23.9965 7.64682C23.3639 6.16359 22.4695 4.83306 21.3132 3.67701C20.157 2.52097 18.8482 1.62667 17.3648 0.994116C15.8159 0.339755 14.1798 0.0125732 12.5 0.0125732C10.7984 0.0125732 9.16231 0.339755 7.63525 0.994116C6.15183 1.62667 4.82112 2.52097 3.66492 3.67701C2.50873 4.83306 1.61431 6.16359 0.981676 7.64682C0.327225 9.17364 0 10.8096 0 12.5109C0 14.1905 0.327225 15.8264 0.981676 17.3751C1.61431 18.8583 2.50873 20.1888 3.66492 21.3449C4.82112 22.5009 6.15183 23.3952 7.63525 24.0059C9.18411 24.6603 10.8202 24.9875 12.5 24.9875C14.1798 24.9875 15.8159 24.6603 17.3648 24.0059C18.8482 23.3734 20.1788 22.4791 21.3351 21.3231C22.4913 20.167 23.3857 18.8364 24.0183 17.3532C24.6728 15.8046 25 14.1687 25 12.4891C25 10.8096 24.651 9.17364 23.9965 7.64682ZM8.35515 11.333C8.85688 9.32635 10.6894 7.86498 12.849 7.86498H21.5314C22.0986 8.93375 22.4476 10.1116 22.5785 11.333H8.35515ZM22.5785 13.6888C22.4476 14.9103 22.0768 16.0881 21.5314 17.1569H12.849C10.6894 17.1569 8.87868 15.6737 8.35515 13.6888H22.5785ZM5.32286 5.33473C7.24258 3.41527 9.79496 2.36829 12.5 2.36829C15.205 2.36829 17.7574 3.41527 19.6771 5.33473C19.7426 5.40017 19.7862 5.4438 19.8516 5.50923H12.849C10.9729 5.50923 9.22777 6.22903 7.89701 7.55958C6.84991 8.60652 6.17364 9.91526 5.95549 11.333H2.42146C2.68324 9.06459 3.68673 6.97064 5.32286 5.33473ZM12.5 22.6536C9.79496 22.6536 7.24258 21.6066 5.32286 19.6871C3.68673 18.0512 2.68324 15.9354 2.42146 13.6888H5.95549C6.19546 15.1066 6.87172 16.4153 7.89701 17.4623C9.22777 18.7928 10.9729 19.5126 12.849 19.5126H19.8516C19.7862 19.5781 19.7426 19.6217 19.6771 19.6871C17.7574 21.6066 15.205 22.6536 12.5 22.6536Z"
    //           fill="#2A283E"
    //           />
    //       </svg>
    //         {"verify WorldID"}
    //       </span>
    //     </span>
    //     <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
    //   </button>
    // </div>
  );
};

export default WorldID;
//bo
// chain: "polygon"
// credential_type:"phone"
// merkle_root:"0x13742cdb7ce3cfcf27447a1e446998c427cb46a8e53e949eaa2a5cdbcb8069e6"
// nullifier_hash:"0x2b98ebff3cb7eff76b4b31f9115dc8e248cbe8da9a9f538596a54f326d841676"
// proof:"0x2c32ea8ae17a1ad44558f27235a5835b515eb7f917d0800fd2f65aeb8b79a7ca0610e045dd86f9b201ea78a270325c527abba700e5da517001c51cdba0e50db901d9443899215e8542b33c303d4257a9f92109bebf8c75148f03cb2a0eaa19741c398e8557fc30d7d11d767874e68bfbb4110e2e47892628a2f55ec499d7dc5f28874ffbb0f4db8b7235e2e6c34cb0200190485c60d8b2a4aa08c971c311d4161a16dabc248d8d63aa8ac6bbe63dde5dc99cbdeb249444437d28c1bcb71934a70eec2d47503ad794f58f331acd23f0392c89d4ccae6081ebb85da31717cbbba00857c11914f06d48cb1b349263839bffd85d5feef526d820d9f5d50eb76251b3"

// chain:"polygon"
// credential_type:"phone"
// merkle_root:"0x13742cdb7ce3cfcf27447a1e446998c427cb46a8e53e949eaa2a5cdbcb8069e6"
// nullifier_hash:"0x2b98ebff3cb7eff76b4b31f9115dc8e248cbe8da9a9f538596a54f326d841676"
// proof:"0x1d090eb14c12c65a0b49fa967f73ef3ed67d6ad238269727fd234948f804b6b7129c4b7256d1e923c2ee77af2749486e6c90122c00056eb545b103d15432a7b018afea175d5594c57dc2a7e62913f026c2c04961a1f1fcb7630d2c81dbc4d52b0fde39b5ced03f7934074b960b72df770365c49d9d80533bcb6b0b77caaa21f00f2d8dae5e5a0775b065171f60efb29ef920d9fe5935575589a8f4d5ca6baf8903c67779fab039a9ae5bf85b7d2e6231b6caab1abaf2a56d5605794b4392a2472970995b63f173b77c94b2abddc7a28a238f81801186c604f710ad9f5d2b8b43047827d70059c1e9603414914e3d607169d79d4e7c5eca0e7f37a26ddf4740ae"

// chain:"polygon"
// credential_type:"orb"
// merkle_root:"0x13742cdb7ce3cfcf27447a1e446998c427cb46a8e53e949eaa2a5cdbcb8069e6"
// nullifier_hash:"0x11d1b2016f3a8f1fe8fecd01b0f88eda06547cd7a25a853a21bdbd3e744f4827"
// proof:"0x28df3df5546ddccc9938b7cfe58060b6d10e14f7bdba62043bf4b3f23a24ae6e0313b887de32356d6e5