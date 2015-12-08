@extends('dashboard.layouts.main')

@section('title')
    Edit permission
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <form role="form" method="post" action="{{ url('dashboard/permissions/edit/' . $permission->id) }}">
                        {!! csrf_field() !!}
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" name="name" value="{{
                                old('name') ? old('name') : $permission->name }}" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <label>Display Name</label>
                            <input type="text" class="form-control" name="display_name" value="{{
                                old('display_name') ? old('display_name') : $permission->display_name
                                }}" placeholder="Display Name">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="description" cols="30" rows="10">{{
                                old('description') ? old('description') : $permission->description }}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Status:</label>
                            <label class="checkbox-inline">
                                <input type="checkbox" class="checkbox" name="active" value="1" {{
                                    (old('active') ? (old('active') === '1' ? 'checked' : '') :
                                    ($permission->active ? 'checked' : '')) }}>
                                Active
                            </label>
                        </div>
                        <button type="submit" class="btn btn-success">Save</button>
                        <a href="{{ url('dashboard/permissions') }}" class="btn btn-default">Go back</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
