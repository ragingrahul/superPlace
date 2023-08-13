import CustomButton from "../button"

const MintZora = () => {
  return (
    <CustomButton open={()=> console.log("test")}>
      <span className="relative flex">
        {"Mint canvas in zora"}
      </span>
    </CustomButton>
  )
}

export default MintZora