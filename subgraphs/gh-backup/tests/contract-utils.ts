import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { SnapshotCreated } from "../generated/Contract/Contract"

export function createSnapshotCreatedEvent(
  snapshotId: Bytes,
  owner: Address,
  repoName: string,
  commitHash: string,
  timestamp: BigInt,
  htmlUrl: string,
  description: string,
  isPrivate: boolean,
  forksCount: BigInt,
  watchersCount: BigInt,
  size: BigInt,
  hasIssues: boolean,
  branches: string,
  price: BigInt
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
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("htmlUrl", ethereum.Value.fromString(htmlUrl))
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("isPrivate", ethereum.Value.fromBoolean(isPrivate))
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "forksCount",
      ethereum.Value.fromUnsignedBigInt(forksCount)
    )
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "watchersCount",
      ethereum.Value.fromUnsignedBigInt(watchersCount)
    )
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("size", ethereum.Value.fromUnsignedBigInt(size))
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("hasIssues", ethereum.Value.fromBoolean(hasIssues))
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("branches", ethereum.Value.fromString(branches))
  )
  snapshotCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return snapshotCreatedEvent
}
