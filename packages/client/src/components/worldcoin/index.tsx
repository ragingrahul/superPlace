import { CredentialType, IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { useAccount} from "wagmi";
import { decodeAbiParameters } from 'viem'
import { useWriteContract } from '@/hook/useWriteContract';

const WorldID = () => {
  const { address } = useAccount()
  const {triggerDraw} = useWriteContract()

  const onSuccess = (result: ISuccessResult) => {
    const unpackedProof = decodeAbiParameters([{ type: 'uint256[8]' }], result.proof as `0x${string}`)[0]
    console.log(address,result.merkle_root,result.nullifier_hash,unpackedProof)

    triggerDraw([address,result.merkle_root,result.nullifier_hash,unpackedProof,1,1,1])
  };

  return (
    <div>
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
    </div>
  );
};

export default WorldID;
//bo
// 0xD317D930C18CEA30B4cc0213FFA5FAc639525f81
// 0x13742cdb7ce3cfcf27447a1e446998c427cb46a8e53e949eaa2a5cdbcb8069e6
// 0x0b25406fd84e000a44516d055308ac0eac6570ca8775053d5a717e1ee4a2cb0b
// [7528893366896530033399728562270467166741682473090317993198484907889064036177,21064424541006264487338357793961178616609599306403299235642881661611298303930,12199946597665515653437097489967588602869006697629247164371033354999590875570,7119642386819059857433890264229137031771257685921779142382854895506042926146,21266534176349599474620397300906934195513230865001857598765821740920886781870,9181734136465196408871710884182095538743234833493028282485529672995187016995,5724107385592497156790480210531947352385242696775814710603403491111110757586,14824079968261934992914912943852137436582139454336361176030831658539419890787]
