import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { SnapshotCreated } from "../generated/GithubSnapshot/GithubSnapshot"

export function createSnapshotCreatedEvent(
  snapshotId: Bytes,
  owner: Address,
  repoName: string,
  commitHash: string,
  timestamp: BigInt
): SnapshotCreated {
  let snapshotCreatedEvent = changetype<SnapshotCreated>(newMockEvent())

  snapshotCreatedEvent.parameters = new Array()

  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "snapshotId",
      ethereum.Value.fromFixedBytes(snapshotId)
    )
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("repoName", ethereum.Value.fromString(repoName))
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("commitHash", ethereum.Value.fromString(commitHash))
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return snapshotCreatedEvent
}
