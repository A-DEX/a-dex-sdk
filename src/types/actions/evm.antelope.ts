export namespace EVMBridge {
  export type FeeParameters = {
    gas_price: string;
    miner_cut: string;
    ingress_bridge_fee: string;
  };

  export type InitActionData = {
    chainid: string;
    fee_params: FeeParameters;
  };

  export type SetFeeParamsActionData = {
    fee_params: FeeParameters;
  };

  export type AddEgressActionData = {
    accounts: string[];
  };

  export type RemoveEgressActionData = {
    accounts: string[];
  };

  export type FreezeActionData = {
    value: boolean;
  };

  export type ExecInput = {
    context: string;
    from: string;
    to: string;
    data: string;
    value: string;
  };

  export type ExecCallBack = {
    contract: string;
    action: string;
  };

  export type ExecActionData = {
    input: ExecInput;
    callback: ExecCallBack;
  };

  export type PushTxActionData = {
    miner: string;
    rlptx: string;
  };

  export type OpenActionData = {
    owner: string;
  };

  export type CloseActionData = {
    owner: string;
  };

  export type WithdrawActionData = {
    owner: string;
    quantity: string;
    to: string;
  };

  export type GCActionData = {
    max: string;
  };
}
