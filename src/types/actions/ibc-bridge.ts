export namespace IBCBridge {
  export type ProducerKey = {
    producer_name: string;
    block_signing_key: string;
  };

  export type ProducerSchedule = {
    version: string;
    producers: ProducerKey[];
  };

  export type KeyWeight = {
    key: string;
    weight: string;
  };

  export type BlockSigningAuthority = {
    threshold: string;
    keys: KeyWeight[];
  };

  export type ProducerAuthority = {
    producer_name: string;
    authority: BlockSigningAuthority;
  };

  export type ScheduleV2 = {
    version: string;
    producers: ProducerAuthority[];
  };

  export type PermissionLevel = {
    actor: string;
    permission: string;
  };

  export type Action = {
    account: string;
    name: string;
    authorization: PermissionLevel[];
    data: Uint8Array;
  };

  export type AuthSeq = {
    account: string;
    sequence: string;
  };

  export type ActReceipt = {
    receiver: string;
    act_digest: string;
    global_sequence: string;
    recv_sequence: string;
    auth_sequence: AuthSeq[];
    code_sequence: string;
    abi_sequence: string;
  };

  export type ActionProof = {
    action: Action;
    receipt: ActReceipt;
    returnvalue: Uint8Array;
    amproofpath: string[];
  };

  export type InitAActionData = {
    chain_name: string;
    chain_id: string;
    return_value_activated: string;
    initial_schedule: ProducerSchedule;
  };

  export type InitBActionData = {
    chain_name: string;
    chain_id: string;
    return_value_activated: string;
    initial_schedule: ScheduleV2;
  };

  export type CheckProofAActionData = {
    contract: string;
  };

  export type CheckProofBActionData = {
    contract: string;
    actionproof: ActionProof;
  };

  export type CheckProofCActionData = {
    contract: string;
    actionproof: ActionProof;
  };

  export type CheckProofDActionData = {
    blockproof: ActionProof;
  };

  export type SBlockHeader = {
    header: BlockHeader;
    producer_signatures: ;
    previous_bmroot: string;
    bmproofpath: Uint16Array;
  }

  export type AnchorBlock = {
    block: SBlockHeader;
    active_nodes: Uint16Array;
    node_count: string;
  }

  export type HeavyProof = {
    chain_id: string;
    hashes: string[];
    blocktoprove: AnchorBlock;
    bftproof: SBlockHeader[];
  };

  export type CheckProofEActionData = {
    blockproof: HeavyProof;
    actionproof: ActionProof;
  };

  export type HeaderExtension = {
    type: string;
    data: string;
  };

  export type BlockHeader = {
    timestamp: string;
    producer: string;
    confirmed: string;
    previous: string;
    transaction_mroot: string;
    action_mroot: string;
    schedule_version: string;
    new_producers: ProducerSchedule;
    header_extensions: HeaderExtension[];
  };

  export type LightProof = {
    chain_id: string;
    header: BlockHeader;
    root: string;
    bmproofpath: string[];
  }

  export type CheckProofFActionData = {
    blockproof: LightProof;
    actionproof: ActionProof;
  };

  export type DisableActionData = {
    chain_name: string;
  };

  export type EnableActionData = {
    chain_name: string;
  };
}
