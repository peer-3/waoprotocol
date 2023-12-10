import { SnapshotCreated as SnapshotCreatedEvent } from "../generated/Contract/Contract"
import { SnapshotCreated } from "../generated/schema"

export function handleSnapshotCreated(event: SnapshotCreatedEvent): void {
  let entity = new SnapshotCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.snapshotId = event.params.snapshotId
  entity.owner = event.params.owner
  entity.repoName = event.params.repoName
  entity.commitHash = event.params.commitHash
  entity.timestamp = event.params.timestamp
  entity.htmlUrl = event.params.htmlUrl
  entity.description = event.params.description
  entity.isPrivate = event.params.isPrivate
  entity.forksCount = event.params.forksCount
  entity.watchersCount = event.params.watchersCount
  entity.size = event.params.size
  entity.hasIssues = event.params.hasIssues
  entity.branches = event.params.branches
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
