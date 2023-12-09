// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class SnapshotCreated extends ethereum.Event {
  get params(): SnapshotCreated__Params {
    return new SnapshotCreated__Params(this);
  }
}

export class SnapshotCreated__Params {
  _event: SnapshotCreated;

  constructor(event: SnapshotCreated) {
    this._event = event;
  }

  get snapshotId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get repoName(): string {
    return this._event.parameters[2].value.toString();
  }

  get commitHash(): string {
    return this._event.parameters[3].value.toString();
  }

  get timestamp(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class GithubSnapshot__getSnapshotResult {
  value0: Address;
  value1: string;
  value2: string;
  value3: BigInt;
  value4: string;
  value5: string;
  value6: boolean;
  value7: BigInt;
  value8: BigInt;
  value9: BigInt;
  value10: boolean;
  value11: string;

  constructor(
    value0: Address,
    value1: string,
    value2: string,
    value3: BigInt,
    value4: string,
    value5: string,
    value6: boolean,
    value7: BigInt,
    value8: BigInt,
    value9: BigInt,
    value10: boolean,
    value11: string
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
    this.value10 = value10;
    this.value11 = value11;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromString(this.value4));
    map.set("value5", ethereum.Value.fromString(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromUnsignedBigInt(this.value8));
    map.set("value9", ethereum.Value.fromUnsignedBigInt(this.value9));
    map.set("value10", ethereum.Value.fromBoolean(this.value10));
    map.set("value11", ethereum.Value.fromString(this.value11));
    return map;
  }

  getOwner(): Address {
    return this.value0;
  }

  getRepoName(): string {
    return this.value1;
  }

  getCommitHash(): string {
    return this.value2;
  }

  getTimestamp(): BigInt {
    return this.value3;
  }

  getHtmlUrl(): string {
    return this.value4;
  }

  getDescription(): string {
    return this.value5;
  }

  getIsPrivate(): boolean {
    return this.value6;
  }

  getForksCount(): BigInt {
    return this.value7;
  }

  getWatchersCount(): BigInt {
    return this.value8;
  }

  getSize(): BigInt {
    return this.value9;
  }

  getHasIssues(): boolean {
    return this.value10;
  }

  getBranches(): string {
    return this.value11;
  }
}

export class GithubSnapshot__snapshotsResult {
  value0: Address;
  value1: string;
  value2: string;
  value3: BigInt;
  value4: string;
  value5: string;
  value6: boolean;
  value7: BigInt;
  value8: BigInt;
  value9: BigInt;
  value10: boolean;
  value11: string;

  constructor(
    value0: Address,
    value1: string,
    value2: string,
    value3: BigInt,
    value4: string,
    value5: string,
    value6: boolean,
    value7: BigInt,
    value8: BigInt,
    value9: BigInt,
    value10: boolean,
    value11: string
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
    this.value10 = value10;
    this.value11 = value11;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromString(this.value4));
    map.set("value5", ethereum.Value.fromString(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromUnsignedBigInt(this.value8));
    map.set("value9", ethereum.Value.fromUnsignedBigInt(this.value9));
    map.set("value10", ethereum.Value.fromBoolean(this.value10));
    map.set("value11", ethereum.Value.fromString(this.value11));
    return map;
  }

  getOwner(): Address {
    return this.value0;
  }

  getRepoName(): string {
    return this.value1;
  }

  getCommitHash(): string {
    return this.value2;
  }

  getTimestamp(): BigInt {
    return this.value3;
  }

  getHtmlUrl(): string {
    return this.value4;
  }

  getDescription(): string {
    return this.value5;
  }

  getIsPrivate(): boolean {
    return this.value6;
  }

  getForksCount(): BigInt {
    return this.value7;
  }

  getWatchersCount(): BigInt {
    return this.value8;
  }

  getSize(): BigInt {
    return this.value9;
  }

  getHasIssues(): boolean {
    return this.value10;
  }

  getBranches(): string {
    return this.value11;
  }
}

export class GithubSnapshot extends ethereum.SmartContract {
  static bind(address: Address): GithubSnapshot {
    return new GithubSnapshot("GithubSnapshot", address);
  }

  getSnapshot(_snapshotId: Bytes): GithubSnapshot__getSnapshotResult {
    let result = super.call(
      "getSnapshot",
      "getSnapshot(bytes32):(address,string,string,uint256,string,string,bool,uint256,uint256,uint256,bool,string)",
      [ethereum.Value.fromFixedBytes(_snapshotId)]
    );

    return new GithubSnapshot__getSnapshotResult(
      result[0].toAddress(),
      result[1].toString(),
      result[2].toString(),
      result[3].toBigInt(),
      result[4].toString(),
      result[5].toString(),
      result[6].toBoolean(),
      result[7].toBigInt(),
      result[8].toBigInt(),
      result[9].toBigInt(),
      result[10].toBoolean(),
      result[11].toString()
    );
  }

  try_getSnapshot(
    _snapshotId: Bytes
  ): ethereum.CallResult<GithubSnapshot__getSnapshotResult> {
    let result = super.tryCall(
      "getSnapshot",
      "getSnapshot(bytes32):(address,string,string,uint256,string,string,bool,uint256,uint256,uint256,bool,string)",
      [ethereum.Value.fromFixedBytes(_snapshotId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GithubSnapshot__getSnapshotResult(
        value[0].toAddress(),
        value[1].toString(),
        value[2].toString(),
        value[3].toBigInt(),
        value[4].toString(),
        value[5].toString(),
        value[6].toBoolean(),
        value[7].toBigInt(),
        value[8].toBigInt(),
        value[9].toBigInt(),
        value[10].toBoolean(),
        value[11].toString()
      )
    );
  }

  snapshots(param0: Bytes): GithubSnapshot__snapshotsResult {
    let result = super.call(
      "snapshots",
      "snapshots(bytes32):(address,string,string,uint256,string,string,bool,uint256,uint256,uint256,bool,string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return new GithubSnapshot__snapshotsResult(
      result[0].toAddress(),
      result[1].toString(),
      result[2].toString(),
      result[3].toBigInt(),
      result[4].toString(),
      result[5].toString(),
      result[6].toBoolean(),
      result[7].toBigInt(),
      result[8].toBigInt(),
      result[9].toBigInt(),
      result[10].toBoolean(),
      result[11].toString()
    );
  }

  try_snapshots(
    param0: Bytes
  ): ethereum.CallResult<GithubSnapshot__snapshotsResult> {
    let result = super.tryCall(
      "snapshots",
      "snapshots(bytes32):(address,string,string,uint256,string,string,bool,uint256,uint256,uint256,bool,string)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GithubSnapshot__snapshotsResult(
        value[0].toAddress(),
        value[1].toString(),
        value[2].toString(),
        value[3].toBigInt(),
        value[4].toString(),
        value[5].toString(),
        value[6].toBoolean(),
        value[7].toBigInt(),
        value[8].toBigInt(),
        value[9].toBigInt(),
        value[10].toBoolean(),
        value[11].toString()
      )
    );
  }
}

export class CreateSnapshotCall extends ethereum.Call {
  get inputs(): CreateSnapshotCall__Inputs {
    return new CreateSnapshotCall__Inputs(this);
  }

  get outputs(): CreateSnapshotCall__Outputs {
    return new CreateSnapshotCall__Outputs(this);
  }
}

export class CreateSnapshotCall__Inputs {
  _call: CreateSnapshotCall;

  constructor(call: CreateSnapshotCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _repoName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _commitHash(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _htmlUrl(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[4].value.toString();
  }

  get _isPrivate(): boolean {
    return this._call.inputValues[5].value.toBoolean();
  }

  get _forksCount(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get _watchersCount(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get _size(): BigInt {
    return this._call.inputValues[8].value.toBigInt();
  }

  get _hasIssues(): boolean {
    return this._call.inputValues[9].value.toBoolean();
  }

  get _branches(): string {
    return this._call.inputValues[10].value.toString();
  }
}

export class CreateSnapshotCall__Outputs {
  _call: CreateSnapshotCall;

  constructor(call: CreateSnapshotCall) {
    this._call = call;
  }
}
