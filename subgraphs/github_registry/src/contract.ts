import { NewBuildCreated as NewBuildCreatedEvent } from "../generated/Contract/Contract"
import { NewBuildCreated } from "../generated/schema"

export function handleNewBuildCreated(event: NewBuildCreatedEvent): void {
  let entity = new NewBuildCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.repository_repoId = event.params.repository.repoId
  entity.repository_name = event.params.repository.name
  entity.repository_fullname = event.params.repository.fullname
  entity.repository_description = event.params.repository.description
  entity.repository_ownerId = event.params.repository.ownerId
  entity.repository_size = event.params.repository.size
  entity.repository_defaultBranch = event.params.repository.defaultBranch
  entity.repository_topics = event.params.repository.topics
  entity.repository_language = event.params.repository.language
  entity.build_branch = event.params.build.branch
  entity.build_commitMessage = event.params.build.commitMessage
  entity.build_commitHash = event.params.build.commitHash
  entity.build_cid = event.params.build.cid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
